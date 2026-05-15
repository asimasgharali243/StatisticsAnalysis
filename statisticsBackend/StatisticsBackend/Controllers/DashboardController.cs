// Controllers/DashboardController.cs
using Microsoft.AspNetCore.Mvc;
using StatisticsBackend.Services;
using System.Data;  // ADD THIS LINE - it's missing!

namespace StatisticsBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    // GET: api/dashboard/companies
    [HttpGet("companies")]
    public async Task<IActionResult> GetCompanies()
    {
        var companies = await _dashboardService.GetCompaniesAsync();
        return Ok(companies);
    }

    // POST: api/dashboard/data
    [HttpPost("data")]
    public async Task<IActionResult> GetDashboardData([FromBody] DashboardRequest request)
    {
        try
        {
            if (request.CompanyIds == null || request.CompanyIds.Count == 0)
            {
                return BadRequest(new { error = "Please select at least one company" });
            }

            var dateFrom = request.DateFrom ?? DateTime.Parse("2020-01-01");
            var dateTo = request.DateTo ?? DateTime.Parse("2026-01-01");

            var result = await _dashboardService.GetDashboardDataAsync(request.CompanyIds, dateFrom, dateTo);
            
            // Convert DataTable to simple JSON-friendly format
            var simplifiedResult = new Dictionary<string, List<Dictionary<string, object>>>();
            
            foreach (var kvp in result)
            {
                var companyData = new List<Dictionary<string, object>>();
                
                if (kvp.Value != null && kvp.Value.Rows.Count > 0)
                {
                    foreach (DataRow row in kvp.Value.Rows)
                    {
                        var rowDict = new Dictionary<string, object>();
                        foreach (DataColumn col in kvp.Value.Columns)
                        {
                            // Handle different data types
                            var value = row[col];
                            rowDict[col.ColumnName] = value ?? DBNull.Value;
                        }
                        companyData.Add(rowDict);
                    }
                }
                simplifiedResult[kvp.Key] = companyData;
            }
            
            return Ok(simplifiedResult);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }


// POST: api/dashboard/receivable-payable
[HttpPost("receivable-payable")]
public async Task<IActionResult> GetReceivablePayableData([FromBody] DashboardRequest request)
{
    try
    {
        if (request.CompanyIds == null || request.CompanyIds.Count == 0)
        {
            return BadRequest(new { error = "Please select at least one company" });
        }

        // Don't pass dates since your SP doesn't need them
        var result = await _dashboardService.GetReceivablePayableDataAsync(request.CompanyIds);
        
        return Ok(new { success = true, data = result });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { success = false, error = ex.Message });
    }
}

// Optional: GET endpoint for just one company
[HttpGet("receivable-payable/{companyId}")]
public async Task<IActionResult> GetCompanyReceivablePayable(string companyId)
{
    try
    {
        var request = new DashboardRequest
        {
            CompanyIds = new List<string> { companyId }
        };

        var result = await _dashboardService.GetReceivablePayableDataAsync(request.CompanyIds);
        
        return Ok(new { success = true, data = result.FirstOrDefault() });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { success = false, error = ex.Message });
    }
}

// Controllers/DashboardController.cs - Add these new endpoints

[HttpPost("closing-balance")]
public async Task<IActionResult> GetClosingBalance([FromBody] ClosingBalanceRequest request)
{
    try
    {
        if (request.CompanyIds == null || request.CompanyIds.Count == 0)
        {
            return BadRequest(new { error = "Please select at least one company" });
        }

        var result = await _dashboardService.GetClosingBalanceDataAsync(
            request.CompanyIds, 
            request.AsOnDate ?? DateTime.Now,
            request.Type);
        
        return Ok(new { success = true, data = result });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { success = false, error = ex.Message });
    }
}

[HttpGet("closing-balance/{companyId}/{type}")]
public async Task<IActionResult> GetCompanyClosingBalance(string companyId, int type, [FromQuery] DateTime? asOnDate)
{
    try
    {
        var request = new ClosingBalanceRequest
        {
            CompanyIds = new List<string> { companyId },
            AsOnDate = asOnDate ?? DateTime.Now,
            Type = type
        };

        var result = await _dashboardService.GetClosingBalanceDataAsync(
            request.CompanyIds, 
            request.AsOnDate.Value,
            request.Type);
        
        return Ok(new { success = true, data = result.FirstOrDefault() });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { success = false, error = ex.Message });
    }
}

public class ClosingBalanceRequest
{
    public List<string> CompanyIds { get; set; } = new();
    public DateTime? AsOnDate { get; set; }
    public int Type { get; set; } // 1=Receivable/Customers, 2=Payable/Suppliers, 3=Expense, 4=Bank
}


    
}

public class DashboardRequest
{
    public List<string> CompanyIds { get; set; } = new();
    public DateTime? DateFrom { get; set; }
    public DateTime? DateTo { get; set; }
}