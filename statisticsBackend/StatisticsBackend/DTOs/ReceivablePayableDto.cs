// DTOs/ReceivablePayableDto.cs
namespace StatisticsBackend.DTOs;

public class ReceivablePayableDto
{
    public string? ReceiveName { get; set; }
    public decimal? Receivable { get; set; }
    public string? PayableName { get; set; }
    public decimal? Payable { get; set; }
}

public class CompanyReceivablePayableDto
{
    public string CompanyId { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public List<ReceivablePayableDto> Data { get; set; } = new();
    public decimal TotalReceivable { get; set; }
    public decimal TotalPayable { get; set; }
}

public class ClosingBalanceItemDto
{
    public int Id { get; set; }
    public decimal ClosingBalance { get; set; }
    public string Name { get; set; } = string.Empty;
    public int BusinessType { get; set; }
    public string? ContactNo { get; set; }
}

public class CompanyClosingBalanceDto
{
    public string CompanyId { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public int Type { get; set; }
    public string TypeName { get; set; } = string.Empty;
    public List<ClosingBalanceItemDto> Data { get; set; } = new();
    public decimal TotalClosingBalance { get; set; }
}