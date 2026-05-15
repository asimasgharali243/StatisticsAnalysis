using Microsoft.Data.SqlClient;
using System.Data;
using StatisticsBackend.DTOs;

namespace StatisticsBackend.Data;

public class DatabaseHelper
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<DatabaseHelper> _logger;
    private readonly List<Company> _companies;

    public DatabaseHelper(IConfiguration configuration, ILogger<DatabaseHelper> logger)
    {
        _configuration = configuration;
        _logger = logger;
        
        // Load companies once at startup
        _companies = _configuration.GetSection("CompanyDatabases").Get<List<Company>>() ?? new List<Company>();
        
        _logger.LogInformation("Loaded {Count} companies from configuration", _companies.Count);
    }

    public List<Company> GetAllCompanies()
    {
        return _companies;
    }

    private string GetCompanyConnectionString(string companyId)
    {
        var company = _companies.FirstOrDefault(c => c.Id == companyId);
        if (company == null)
        {
            throw new ArgumentException($"Company {companyId} not found");
        }

        // Try to get connection string from configuration
        var connectionString = _configuration[$"CompanyDatabases:{companyId}:ConnectionString"];
        Console.WriteLine($"Trying to get connection string for {companyId} from configuration: {connectionString}");
        if (string.IsNullOrEmpty(connectionString))
        {
            // Try by index
            var index = _companies.FindIndex(c => c.Id == companyId);
            if (index >= 0)
            {
                connectionString = _configuration[$"CompanyDatabases:{index}:ConnectionString"];
            }
        }
        
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException($"Connection string not found for company {companyId}");
        }
        
        return connectionString;
    }

    public async Task<DataTable> ExecuteStoredProcedure(string companyId, DateTime dateFrom, DateTime dateTo)
    {
        var dataTable = new DataTable();
        
        try
        {
            _logger.LogInformation("Executing stored procedure for company {CompanyId}", companyId);
            
            var connectionString = GetCompanyConnectionString(companyId);
            Console.WriteLine($"Using connection string for {companyId}: {connectionString}");
            using var connection = new SqlConnection(connectionString);
            Console.WriteLine($"Created SQL connection for {companyId}");
            using var command = new SqlCommand("sp_getdashboard2", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@datefrom", dateFrom);
            command.Parameters.AddWithValue("@dateto", dateTo);
            
            await connection.OpenAsync();
            Console.WriteLine($"Opened SQL connection for {companyId}");
            using var reader = await command.ExecuteReaderAsync();
            Console.WriteLine($"Executed stored procedure for {companyId}");
            dataTable.Load(reader);
            Console.WriteLine($"Loaded data into DataTable for {companyId}, rows: {dataTable.Rows.Count}");
            _logger.LogInformation("Successfully fetched {RowCount} rows for {CompanyId}", dataTable.Rows.Count, companyId);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error executing stored procedure for {companyId}: {ex.Message}");
            _logger.LogError(ex, "Error executing stored procedure for {CompanyId}", companyId);
            throw;
        }
        
        return dataTable;
    }

    public async Task<bool> TestCompanyConnection(string companyId)
    {
        try
        {
            var connectionString = GetCompanyConnectionString(companyId);
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to connect to company {CompanyId}", companyId);
            return false;
        }
    }

    public async Task<Dictionary<string, bool>> TestAllCompanyConnections()
    {
        var results = new Dictionary<string, bool>();
        foreach (var company in _companies)
        {
            results[company.Id] = await TestCompanyConnection(company.Id);
        }
        return results;
    }

// Add this method to your DatabaseHelper class in Data/DbConnectionFactory.cs

public async Task<DataTable> ExecuteReceivablePayableStoredProcedure(string companyId)
{
    var dataTable = new DataTable();
    
    try
    {
        _logger.LogInformation("Executing receivable/payable stored procedure for company {CompanyId}", companyId);
        
        var connectionString = GetCompanyConnectionString(companyId);
        using var connection = new SqlConnection(connectionString);
        using var command = new SqlCommand("Sp_getreceiveablePayable", connection);
        command.CommandType = CommandType.StoredProcedure;
        
        await connection.OpenAsync();
        using var reader = await command.ExecuteReaderAsync();
        dataTable.Load(reader);
        
        _logger.LogInformation("Successfully fetched {RowCount} receivable/payable rows for {CompanyId}", 
            dataTable.Rows.Count, companyId);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error executing receivable/payable stored procedure for {CompanyId}", companyId);
        throw;
    }
    
    return dataTable;
}

public async Task<DataTable> ExecuteClosingBalanceStoredProcedure(string companyId, DateTime asOnDate, int type)
{
    var dataTable = new DataTable();
    
    try
    {
        _logger.LogInformation("Executing closing balance stored procedure for company {CompanyId}, Type: {Type}", companyId, type);
        
        var connectionString = GetCompanyConnectionString(companyId);
        using var connection = new SqlConnection(connectionString);
        using var command = new SqlCommand("sp_rptClosingBalance", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.Parameters.AddWithValue("@DateTo", asOnDate);
        command.Parameters.AddWithValue("@Type", type);
        
        await connection.OpenAsync();
        using var reader = await command.ExecuteReaderAsync();
        dataTable.Load(reader);
        
        _logger.LogInformation("Successfully fetched {RowCount} rows for company {CompanyId}, Type: {Type}", 
            dataTable.Rows.Count, companyId, type);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error executing closing balance stored procedure for {CompanyId}, Type: {Type}", companyId, type);
        throw;
    }
    
    return dataTable;
}








}
// // Data/DatabaseHelper.cs
// using Microsoft.Data.SqlClient;
// using System.Data;
// using StatisticsBackend.DTOs;

// namespace StatisticsBackend.Data;

// public class DatabaseHelper
// {
//     private readonly IConfiguration _configuration;
//     private readonly ILogger<DatabaseHelper> _logger;

//     public DatabaseHelper(IConfiguration configuration, ILogger<DatabaseHelper> logger)
//     {
//         _configuration = configuration;
//         _logger = logger;
//     }

//     // Get all companies from appsettings.json
//     public List<Company> GetAllCompanies()
//     {
//         var companies = _configuration.GetSection("CompanyDatabases").Get<List<Company>>();
//         return companies ?? new List<Company>();
//     }

//     // Execute stored procedure for a specific company
//     public async Task<DataTable> ExecuteStoredProcedure(string companyId, DateTime dateFrom, DateTime dateTo)
//     {
//         // Get connection string for this company
//         var companies = GetAllCompanies();
//         var company = companies.FirstOrDefault(c => c.Id == companyId);
        
//         if (company == null)
//             throw new ArgumentException($"Company {companyId} not found");

//         var connectionString = _configuration[$"CompanyDatabases:{companies.IndexOf(company)}:ConnectionString"];
        
//         using var connection = new SqlConnection(connectionString);
//         using var command = new SqlCommand("sp_getdashboard", connection);
//         command.CommandType = CommandType.StoredProcedure;
//         command.Parameters.AddWithValue("@datefrom", dateFrom);
//         command.Parameters.AddWithValue("@dateto", dateTo);
        
//         var dataTable = new DataTable();
        
//         try
//         {
//             await connection.OpenAsync();
//             using var reader = await command.ExecuteReaderAsync();
//             dataTable.Load(reader);
//             _logger.LogInformation("Successfully fetched data for {CompanyId}", companyId);
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Error executing stored procedure for {CompanyId}", companyId);
//             throw;
//         }
        
//         return dataTable;
//     }
// }