// // Controllers/AuthController.cs
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Data.SqlClient;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using StatisticsBackend.DTOs;
// using Microsoft.IdentityModel.Tokens;

// namespace StatisticsBackend.Controllers;

// [ApiController]
// [Route("api/[controller]")]
// public class AuthController : ControllerBase
// {
//     private readonly IConfiguration _configuration;
//     private readonly ILogger<AuthController> _logger;

//     public AuthController(IConfiguration configuration, ILogger<AuthController> logger)
//     {
//         _configuration = configuration;
//         _logger = logger;
//     }

//     // Simple Base64 Encode (same as your example)
//     private string EncodePassword(string password)
//     {
//         return Convert.ToBase64String(Encoding.UTF8.GetBytes(password));
//     }

//     // Simple Base64 Decode
//     private string DecodePassword(string encodedPassword)
//     {
//         try
//         {
//             var decodedBytes = Convert.FromBase64String(encodedPassword);
//             return Encoding.UTF8.GetString(decodedBytes);
//         }
//         catch
//         {
//             return encodedPassword; // Return as-is if not valid Base64
//         }
//     }

//     // Check password using multiple methods (same as your working code)
//     private bool CheckPassword(string? storedPassword, string attemptedPassword)
//     {
//         if (string.IsNullOrEmpty(storedPassword))
//         {
//             _logger.LogWarning("Stored password is null or empty");
//             return false;
//         }

//         _logger.LogDebug("Checking password - Stored: '{Stored}', Attempted: '{Attempted}'", storedPassword, attemptedPassword);

//         // Method 1: Direct comparison
//         if (storedPassword == attemptedPassword)
//         {
//             _logger.LogInformation("Password matched: Direct comparison");
//             return true;
//         }

//         // Method 2: Encode attempted password (same as stored format)
//         var encodedAttempted = EncodePassword(attemptedPassword);
//         if (storedPassword == encodedAttempted)
//         {
//             _logger.LogInformation("Password matched: Encoded attempted password");
//             return true;
//         }

//         // Method 3: Decode stored password and compare
//         try
//         {
//             var decodedStored = DecodePassword(storedPassword);
//             if (decodedStored == attemptedPassword)
//             {
//                 _logger.LogInformation("Password matched: Decoded stored password");
//                 return true;
//             }
//         }
//         catch (Exception ex)
//         {
//             _logger.LogDebug(ex, "Decode error");
//         }

//         // Method 4: Double decode (for passwords that are double encoded)
//         try
//         {
//             var firstDecode = DecodePassword(storedPassword);
//             var secondDecode = DecodePassword(firstDecode);
//             if (secondDecode == attemptedPassword)
//             {
//                 _logger.LogInformation("Password matched: Double decoded");
//                 return true;
//             }
//         }
//         catch (Exception ex)
//         {
//             _logger.LogDebug(ex, "Double decode error");
//         }

//         _logger.LogWarning("Password check FAILED - No match found");
//         return false;
//     }

//     private string GenerateJwtToken(UserDto user)
//     {
//         var tokenHandler = new JwtSecurityTokenHandler();
//         var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"] ?? "your-super-secret-key-at-least-32-characters-long-for-production");
        
//         var issuer = _configuration["Jwt:Issuer"] ?? "StatisticsBackend";
//         var audience = _configuration["Jwt:Audience"] ?? "StatisticsBackendUsers";
        
//         var claims = new[]
//         {
//             new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
//             new Claim(ClaimTypes.Name, user.Email),
//             new Claim(ClaimTypes.GivenName, user.FirstName),
//             new Claim(ClaimTypes.Surname, user.LastName),
//             new Claim(ClaimTypes.Email, user.Email)
//         };

//         var tokenDescriptor = new SecurityTokenDescriptor
//         {
//             Subject = new ClaimsIdentity(claims),
//             Expires = DateTime.UtcNow.AddDays(7),
//             Issuer = issuer,
//             Audience = audience,
//             SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//         };

//         var token = tokenHandler.CreateToken(tokenDescriptor);
//         return tokenHandler.WriteToken(token);
//     }

//     private string GetConnectionString()
//     {
//         return   _configuration["dbMaster:ConnectionString"] ?? "Server=DESKTOP-GTCFCQS\\SQLEXPRESS;Database=dbMaster;Trusted_Connection=true;TrustServerCertificate=true;";
//     }

//     [HttpPost("login")]
//     public async Task<IActionResult> Login([FromBody] LoginDto request)
//     {
//         try
//         {
//             using var connection = new SqlConnection(GetConnectionString());
//             await connection.OpenAsync();

//             var query = @"SELECT Id, FirstName, LastName, Email, PasswordHash 
//                          FROM Users 
//                          WHERE Email = @Email";
            
//             using var command = new SqlCommand(query, connection);
//             command.Parameters.AddWithValue("@Email", request.Email);
            
//             using var reader = await command.ExecuteReaderAsync();
            
//             if (await reader.ReadAsync())
//             {
//                 var storedHash = reader["PasswordHash"].ToString();
                
//                 // Use the enhanced password check method (supports Base64 encoded passwords)
//                 if (CheckPassword(storedHash, request.Password))
//                 {
//                     var user = new UserDto
//                     {
//                         Id = reader.GetInt32(0),
//                         FirstName = reader.GetString(1),
//                         LastName = reader.GetString(2),
//                         Email = reader.GetString(3)
//                     };
                    
//                     // Generate JWT token
//                     var token = GenerateJwtToken(user);
                    
//                     return Ok(new AuthResponseDto
//                     {
//                         Success = true,
//                         Message = "Login successful",
//                         User = user,
//                         Token = token
//                     });
//                 }
//             }
            
//             return Unauthorized(new AuthResponseDto
//             {
//                 Success = false,
//                 Message = "Invalid email or password"
//             });
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Login error");
//             return StatusCode(500, new AuthResponseDto
//             {
//                 Success = false,
//                 Message = "An error occurred during login"
//             });
//         }
//     }

//     [HttpPost("register")]
//     public async Task<IActionResult> Register([FromBody] RegisterDto request)
//     {
//         try
//         {
//             using var connection = new SqlConnection(GetConnectionString());
//             await connection.OpenAsync();
            
//             // Check if user exists
//             var checkQuery = "SELECT COUNT(*) FROM Users WHERE Email = @Email";
//             using var checkCommand = new SqlCommand(checkQuery, connection);
//             checkCommand.Parameters.AddWithValue("@Email", request.Email);
//             var userExists = (int)await checkCommand.ExecuteScalarAsync() > 0;
            
//             if (userExists)
//             {
//                 return BadRequest(new AuthResponseDto
//                 {
//                     Success = false,
//                     Message = "User already exists"
//                 });
//             }
            
//             // Encode password using Base64 (same as your example)
//             var encodedPassword = EncodePassword(request.Password);
            
//             // Insert new user
//             var insertQuery = @"INSERT INTO Users (FirstName, LastName, Email, PasswordHash, CreatedAt) 
//                                VALUES (@FirstName, @LastName, @Email, @PasswordHash, @CreatedAt)";
            
//             using var insertCommand = new SqlCommand(insertQuery, connection);
//             insertCommand.Parameters.AddWithValue("@FirstName", request.FirstName);
//             insertCommand.Parameters.AddWithValue("@LastName", request.LastName);
//             insertCommand.Parameters.AddWithValue("@Email", request.Email);
//             insertCommand.Parameters.AddWithValue("@PasswordHash", encodedPassword);
//             insertCommand.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);
            
//             await insertCommand.ExecuteNonQueryAsync();
            
//             return Ok(new AuthResponseDto
//             {
//                 Success = true,
//                 Message = "Registration successful"
//             });
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Registration error");
//             return StatusCode(500, new AuthResponseDto
//             {
//                 Success = false,
//                 Message = "An error occurred during registration"
//             });
//         }
//     }

//     [HttpPut("profile")]
//     public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto request)
//     {
//         try
//         {
//             using var connection = new SqlConnection(GetConnectionString());
//             await connection.OpenAsync();
            
//             // Get current user
//             var getUserQuery = "SELECT PasswordHash FROM Users WHERE Email = @Email";
//             using var getUserCommand = new SqlCommand(getUserQuery, connection);
//             getUserCommand.Parameters.AddWithValue("@Email", request.Email);
            
//             var currentHash = await getUserCommand.ExecuteScalarAsync() as string;
            
//             // Verify current password if provided
//             if (!string.IsNullOrEmpty(request.CurrentPassword))
//             {
//                 if (!CheckPassword(currentHash, request.CurrentPassword))
//                 {
//                     return Unauthorized(new AuthResponseDto
//                     {
//                         Success = false,
//                         Message = "Current password is incorrect"
//                     });
//                 }
//             }
            
//             // Build update query
//             var updateQuery = @"UPDATE Users 
//                                SET FirstName = @FirstName, 
//                                    LastName = @LastName, 
//                                    UpdatedAt = @UpdatedAt";
            
//             var parameters = new List<SqlParameter>
//             {
//                 new SqlParameter("@FirstName", request.FirstName),
//                 new SqlParameter("@LastName", request.LastName),
//                 new SqlParameter("@UpdatedAt", DateTime.UtcNow),
//                 new SqlParameter("@Email", request.Email)
//             };
            
//             if (!string.IsNullOrEmpty(request.NewPassword))
//             {
//                 updateQuery += ", PasswordHash = @PasswordHash";
//                 parameters.Add(new SqlParameter("@PasswordHash", EncodePassword(request.NewPassword)));
//             }
            
//             updateQuery += " WHERE Email = @Email";
            
//             using var updateCommand = new SqlCommand(updateQuery, connection);
//             updateCommand.Parameters.AddRange(parameters.ToArray());
            
//             await updateCommand.ExecuteNonQueryAsync();
            
//             return Ok(new AuthResponseDto
//             {
//                 Success = true,
//                 Message = "Profile updated successfully",
//                 User = new UserDto
//                 {
//                     FirstName = request.FirstName,
//                     LastName = request.LastName,
//                     Email = request.Email
//                 }
//             });
//         }
//         catch (Exception ex)
//         {
//             _logger.LogError(ex, "Profile update error");
//             return StatusCode(500, new AuthResponseDto
//             {
//                 Success = false,
//                 Message = "An error occurred while updating profile"
//             });
//         }
//     }

//     [HttpPost("validate-token")]
//     public IActionResult ValidateToken([FromBody] TokenValidationRequest request)
//     {
//         try
//         {
//             var tokenHandler = new JwtSecurityTokenHandler();
//             var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"] ?? "your-super-secret-key-at-least-32-characters-long-for-production");
            
//             tokenHandler.ValidateToken(request.Token, new TokenValidationParameters
//             {
//                 ValidateIssuerSigningKey = true,
//                 IssuerSigningKey = new SymmetricSecurityKey(key),
//                 ValidateIssuer = true,
//                 ValidIssuer = _configuration["Jwt:Issuer"] ?? "StatisticsBackend",
//                 ValidateAudience = true,
//                 ValidAudience = _configuration["Jwt:Audience"] ?? "StatisticsBackendUsers",
//                 ClockSkew = TimeSpan.Zero
//             }, out SecurityToken validatedToken);

//             return Ok(new { valid = true });
//         }
//         catch
//         {
//             return Ok(new { valid = false });
//         }
//     }
// }

// public class TokenValidationRequest
// {
//     public string Token { get; set; } = string.Empty;
// }

using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using StatisticsBackend.DTOs;
using Microsoft.IdentityModel.Tokens;

namespace StatisticsBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IConfiguration configuration, ILogger<AuthController> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    private string GetMasterConnectionString()
    {
        var connString = _configuration["dbMaster:ConnectionString"];
        
        if (string.IsNullOrEmpty(connString))
        {
            connString = Environment.GetEnvironmentVariable("MASTER_DB_CONNECTION");
        }
        
        if (string.IsNullOrEmpty(connString))
        {
            throw new InvalidOperationException("Master database connection string not configured");
        }
        
        return connString;
    }

    private string EncodePassword(string password)
    {
        return Convert.ToBase64String(Encoding.UTF8.GetBytes(password));
    }

    private bool CheckPassword(string? storedPassword, string attemptedPassword)
    {
        if (string.IsNullOrEmpty(storedPassword)) return false;

        if (storedPassword == attemptedPassword) return true;
        if (storedPassword == EncodePassword(attemptedPassword)) return true;

        try
        {
            var decoded = Encoding.UTF8.GetString(Convert.FromBase64String(storedPassword));
            if (decoded == attemptedPassword) return true;
        }
        catch { }

        return false;
    }

    private string GenerateJwtToken(UserDto user)
    {
        var jwtSecret = _configuration["Jwt:Secret"] ?? 
                       Environment.GetEnvironmentVariable("JWT_SECRET") ??
                       "your-super-secret-key-at-least-32-characters-long-for-production";
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(jwtSecret);
        
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Email),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("FirstName", user.FirstName),
            new Claim("LastName", user.LastName)
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = _configuration["Jwt:Issuer"] ?? "StatisticsBackend",
            Audience = _configuration["Jwt:Audience"] ?? "StatisticsBackendUsers",
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto request)
    {
        try
        {
            _logger.LogInformation("Login attempt for email: {Email}", request.Email);

            var connectionString = GetMasterConnectionString();
            
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"SELECT Id, FirstName, LastName, Email, PasswordHash 
                         FROM Users 
                         WHERE Email = @Email";
            
            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Email", request.Email);
            
            using var reader = await command.ExecuteReaderAsync();
            
            if (await reader.ReadAsync())
            {
                var storedHash = reader["PasswordHash"].ToString();
                
                if (CheckPassword(storedHash, request.Password))
                {
                    var user = new UserDto
                    {
                        Id = reader.GetInt32(0),
                        FirstName = reader.GetString(1),
                        LastName = reader.GetString(2),
                        Email = reader.GetString(3)
                    };
                    
                    var token = GenerateJwtToken(user);
                    
                    return Ok(new AuthResponseDto
                    {
                        Success = true,
                        Message = "Login successful",
                        User = user,
                        Token = token
                    });
                }
            }
            
            return Unauthorized(new AuthResponseDto
            {
                Success = false,
                Message = "Invalid email or password"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Login error");
            return StatusCode(500, new AuthResponseDto
            {
                Success = false,
                Message = $"An error occurred during login: {ex.Message}"
            });
        }
    }
}