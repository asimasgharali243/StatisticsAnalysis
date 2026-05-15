// // Services/DashboardService.cs
// using System.Data;
// using StatisticsBackend.Data;
// using StatisticsBackend.DTOs;

// namespace StatisticsBackend.Services;

// public interface IDashboardService
// {
//     Task<List<Company>> GetCompaniesAsync();
//     Task<Dictionary<string, DataTable>> GetDashboardDataAsync(List<string> companyIds, DateTime dateFrom, DateTime dateTo);
//     Task<List<CompanyReceivablePayableDto>> GetReceivablePayableDataAsync(List<string> companyIds, DateTime dateFrom, DateTime dateTo);
// }

// public class DashboardService : IDashboardService
// {
//     private readonly DatabaseHelper _databaseHelper;
//     private readonly ILogger<DashboardService> _logger;

//     public DashboardService(DatabaseHelper databaseHelper, ILogger<DashboardService> logger)
//     {
//         _databaseHelper = databaseHelper;
//         _logger = logger;
//     }

//     public Task<List<Company>> GetCompaniesAsync()
//     {
//         return Task.FromResult(_databaseHelper.GetAllCompanies());
//     }

//     public async Task<Dictionary<string, DataTable>> GetDashboardDataAsync(List<string> companyIds, DateTime dateFrom, DateTime dateTo)
//     {
//         var results = new Dictionary<string, DataTable>();
        
//         foreach (var companyId in companyIds)
//         {
//             try
//             {
//                 var data = await _databaseHelper.ExecuteStoredProcedure(companyId, dateFrom, dateTo);
//                 results[companyId] = data;
//                 _logger.LogInformation("Processed {CompanyId} successfully", companyId);
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Failed to get data for {CompanyId}", companyId);
//                 results[companyId] = new DataTable(); // Empty table on error
//             }
//         }
        
//         return results;
//     }

//     // Add this method to your DashboardService class
// public async Task<List<CompanyReceivablePayableDto>> GetReceivablePayableDataAsync(
//     List<string> companyIds, DateTime dateFrom, DateTime dateTo)
// {
//     var results = new List<CompanyReceivablePayableDto>();
    
//     foreach (var companyId in companyIds)
//     {
//         try
//         {
//             var dataTable = await _databaseHelper.ExecuteReceivablePayableStoredProcedure(
//                 companyId, dateFrom, dateTo);
            
//             var companyInfo = _databaseHelper.GetAllCompanies()
//                 .FirstOrDefault(c => c.Id == companyId);
            
//             var companyData = new CompanyReceivablePayableDto
//             {
//                 CompanyId = companyId,
//                 CompanyName = companyInfo?.Name ?? companyId,
//                 Data = new List<ReceivablePayableDto>()
//             };
            
//             decimal totalReceivable = 0;
//             decimal totalPayable = 0;
            
//             foreach (DataRow row in dataTable.Rows)
//             {
//                 var item = new ReceivablePayableDto
//                 {
//                     ReceiveName = row["ReceiveName"] != DBNull.Value ? row["ReceiveName"].ToString() : null,
//                     Receivable = row["Receivable"] != DBNull.Value ? Convert.ToDecimal(row["Receivable"]) : null,
//                     PayableName = row["payableName"] != DBNull.Value ? row["payableName"].ToString() : null,
//                     Payable = row["Payable"] != DBNull.Value ? Convert.ToDecimal(row["Payable"]) : null
//                 };
                
//                 // Sum up totals
//                 if (item.Receivable.HasValue)
//                     totalReceivable += item.Receivable.Value;
//                 if (item.Payable.HasValue)
//                     totalPayable += item.Payable.Value;
                
//                 companyData.Data.Add(item);
//             }
            
//             companyData.TotalReceivable = totalReceivable;
//             companyData.TotalPayable = totalPayable;
//             results.Add(companyData);
            
//             _logger.LogInformation("Processed receivable/payable for {CompanyId}: Receivable={TotalReceivable:N2}, Payable={TotalPayable:N2}", 
//                 companyId, totalReceivable, totalPayable);
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Failed to get receivable/payable data for {CompanyId}", companyId);
//             results.Add(new CompanyReceivablePayableDto
//             {
//                 CompanyId = companyId,
//                 CompanyName = companyId,
//                 Data = new List<ReceivablePayableDto>()
//             });
//         }
//     }
    
//     return results;
// }
// }

// Services/DashboardService.cs
using System.Data;
using StatisticsBackend.Data;
using StatisticsBackend.DTOs;

namespace StatisticsBackend.Services;

public interface IDashboardService
{
    Task<List<Company>> GetCompaniesAsync();
    Task<Dictionary<string, DataTable>> GetDashboardDataAsync(List<string> companyIds, DateTime dateFrom, DateTime dateTo);
    Task<List<CompanyReceivablePayableDto>> GetReceivablePayableDataAsync(List<string> companyIds);
    Task<List<CompanyClosingBalanceDto>> GetClosingBalanceDataAsync(List<string> companyIds, DateTime asOnDate, int type);
}

public class DashboardService : IDashboardService
{
    private readonly DatabaseHelper _databaseHelper;
    private readonly ILogger<DashboardService> _logger;

    public DashboardService(DatabaseHelper databaseHelper, ILogger<DashboardService> logger)
    {
        _databaseHelper = databaseHelper;
        _logger = logger;
    }

    public Task<List<Company>> GetCompaniesAsync()
    {
        return Task.FromResult(_databaseHelper.GetAllCompanies());
    }

    public async Task<Dictionary<string, DataTable>> GetDashboardDataAsync(List<string> companyIds, DateTime dateFrom, DateTime dateTo)
    {
        var results = new Dictionary<string, DataTable>();
        
        foreach (var companyId in companyIds)
        {
            try
            {
                var data = await _databaseHelper.ExecuteStoredProcedure(companyId, dateFrom, dateTo);
                results[companyId] = data;
                _logger.LogInformation("Processed {CompanyId} successfully", companyId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to get data for {CompanyId}", companyId);
                results[companyId] = new DataTable();
            }
        }
        
        return results;
    }

 
// Services/DashboardService.cs - Fix the GetReceivablePayableDataAsync method

public async Task<List<CompanyReceivablePayableDto>> GetReceivablePayableDataAsync(List<string> companyIds)
{
    var results = new List<CompanyReceivablePayableDto>();
    
    foreach (var companyId in companyIds)
    {
        try
        {
            var dataTable = await _databaseHelper.ExecuteReceivablePayableStoredProcedure(companyId);
            
            var companyInfo = _databaseHelper.GetAllCompanies()
                .FirstOrDefault(c => c.Id == companyId);
            
            var companyData = new CompanyReceivablePayableDto
            {
                CompanyId = companyId,
                CompanyName = companyInfo?.Name ?? companyId,
                Data = new List<ReceivablePayableDto>()
            };
            
            decimal totalReceivable = 0;
            decimal totalPayable = 0;
            
            foreach (DataRow row in dataTable.Rows)
            {
                // Get values as nullable decimals first
                decimal? receivableValue = row["Receivable"] != DBNull.Value ? Convert.ToDecimal(row["Receivable"]) : null;
                decimal? payableValue = row["Payable"] != DBNull.Value ? Convert.ToDecimal(row["Payable"]) : null;
                
                var item = new ReceivablePayableDto
                {
                    ReceiveName = row["ReceiveName"] != DBNull.Value ? row["ReceiveName"].ToString() : null,
                    Receivable = receivableValue,
                    PayableName = row["payableName"] != DBNull.Value ? row["payableName"].ToString() : null,
                    Payable = payableValue
                };
                
                // Sum up totals - use .Value for nullable decimals
                if (receivableValue.HasValue && receivableValue.Value > 0)
                    totalReceivable += receivableValue.Value;
                if (payableValue.HasValue && payableValue.Value > 0)
                    totalPayable += payableValue.Value;
                
                companyData.Data.Add(item);
            }
            
            companyData.TotalReceivable = totalReceivable;
            companyData.TotalPayable = totalPayable;
            results.Add(companyData);
            
            _logger.LogInformation("Processed receivable/payable for {CompanyId}: Receivable={Receivable}, Payable={Payable}", 
                companyId, totalReceivable, totalPayable);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get receivable/payable data for {CompanyId}", companyId);
            results.Add(new CompanyReceivablePayableDto
            {
                CompanyId = companyId,
                CompanyName = companyId,
                Data = new List<ReceivablePayableDto>()
            });
        }
    }
    
    return results;
}

    public async Task<List<CompanyClosingBalanceDto>> GetClosingBalanceDataAsync(List<string> companyIds, DateTime asOnDate, int type)
    {
        var results = new List<CompanyClosingBalanceDto>();
        
        string typeName = type switch
        {
            1 => "Receivable (Customers)",
            2 => "Payable (Suppliers)",
            3 => "Expenses",
            4 => "Bank",
            _ => "Unknown"
        };
        
        foreach (var companyId in companyIds)
        {
            try
            {
                var dataTable = await _databaseHelper.ExecuteClosingBalanceStoredProcedure(companyId, asOnDate, type);
                
                var companyInfo = _databaseHelper.GetAllCompanies()
                    .FirstOrDefault(c => c.Id == companyId);
                
                var companyData = new CompanyClosingBalanceDto
                {
                    CompanyId = companyId,
                    CompanyName = companyInfo?.Name ?? companyId,
                    Type = type,
                    TypeName = typeName,
                    Data = new List<ClosingBalanceItemDto>()
                };
                
                decimal total = 0;
                
                foreach (DataRow row in dataTable.Rows)
                {
                    var item = new ClosingBalanceItemDto
                    {
                        Id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                        ClosingBalance = row["closingBalance"] != DBNull.Value ? Convert.ToDecimal(row["closingBalance"]) : 0,
                        Name = row["name"] != DBNull.Value ? row["name"].ToString() : string.Empty,
                        BusinessType = row["BusinessType"] != DBNull.Value ? Convert.ToInt32(row["BusinessType"]) : 0,
                        ContactNo = row["contactNo"] != DBNull.Value ? row["contactNo"].ToString() : null
                    };
                    
                    total += item.ClosingBalance;
                    companyData.Data.Add(item);
                }
                
                companyData.TotalClosingBalance = total;
                results.Add(companyData);
                
                _logger.LogInformation("Processed closing balance for {CompanyId}, Type: {Type}, Total: {Total}", 
                    companyId, type, total);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to get closing balance data for {CompanyId}, Type: {Type}", companyId, type);
                results.Add(new CompanyClosingBalanceDto
                {
                    CompanyId = companyId,
                    CompanyName = companyId,
                    Type = type,
                    TypeName = typeName,
                    Data = new List<ClosingBalanceItemDto>()
                });
            }
        }
        
        return results;
    }
}