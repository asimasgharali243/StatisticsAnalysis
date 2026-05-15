// using StatisticsBackend.Data;
// using StatisticsBackend.Services;
// using StatisticsBackend.DTOs;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
// using System.Text;

// var builder = WebApplication.CreateBuilder(args);

// // Add services
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // JWT Authentication
// var jwtSecret = builder.Configuration["Jwt:Secret"] ?? 
//                 Environment.GetEnvironmentVariable("JWT_SECRET") ??
//                 "your-super-secret-key-at-least-32-characters-long-for-production";
// var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "StatisticsBackend";
// var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "StatisticsBackendUsers";

// var key = Encoding.ASCII.GetBytes(jwtSecret);

// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// })
// .AddJwtBearer(options =>
// {
//     options.RequireHttpsMetadata = false;
//     options.SaveToken = true;
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuerSigningKey = true,
//         IssuerSigningKey = new SymmetricSecurityKey(key),
//         ValidateIssuer = true,
//         ValidIssuer = jwtIssuer,
//         ValidateAudience = true,
//         ValidAudience = jwtAudience,
//         ClockSkew = TimeSpan.Zero
//     };
// });

// // CORS for React - Complete configuration
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReact", policy =>
//     {
//         var allowedOrigins = new[]
//         {
//             "http://localhost:5173",      // Vite dev server
//             "http://localhost:3000",       // Create React App
//             "http://localhost:8080",       // Alternative local
//             "https://akgroup.ultsol.com",  // Production
//             "https://akgroup.ultsol.cloud", // Alternative production
//             "https://dashboard.ultsol.cloud" // Dashboard domain
//         };
        
//         policy.WithOrigins(allowedOrigins)
//               .AllowAnyHeader()
//               .AllowAnyMethod()
//               .AllowCredentials();
//     });
// });

// // Register services
// builder.Services.AddSingleton<DatabaseHelper>();
// builder.Services.AddScoped<IDashboardService, DashboardService>();

// var app = builder.Build();

// // Configure pipeline
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
// else
// {
//     app.UseHsts();
// }

// // Order matters - Important!
// app.UseCors("AllowReact");
// app.UseAuthentication();  // Add this!
// app.UseAuthorization();
// app.MapControllers();

// // Test database connection on startup
// using (var scope = app.Services.CreateScope())
// {
//     var dbHelper = scope.ServiceProvider.GetRequiredService<DatabaseHelper>();
//     var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    
//     try
//     {
//         var isConnected = await dbHelper.TestConnectionAsync();
//         if (isConnected)
//         {
//             logger.LogInformation("Database connection successful");
//         }
//         else
//         {
//             logger.LogError("Database connection failed!");
//         }
//     }
//     catch (Exception ex)
//     {
//         logger.LogError(ex, "Database connection error on startup");
//     }
// }

// app.Run();

// // // Program.cs
// // using StatisticsBackend.Data;
// // using StatisticsBackend.Services;
// // using StatisticsBackend.DTOs;

// // var builder = WebApplication.CreateBuilder(args);

// // // Add services
// // builder.Services.AddControllers();
// // builder.Services.AddEndpointsApiExplorer();
// // builder.Services.AddSwaggerGen();

// // // CORS for React - UPDATED VERSION
// // builder.Services.AddCors(options =>
// // {
// //     options.AddPolicy("AllowReact", policy =>
// //     {
// //         policy.WithOrigins(
// //                 "http://localhost:5173",      // Vite dev server
// //                 "http://localhost:3000",       // Create React App dev server
// //                 "https://akgroup.ultsol.com",  // Production frontend
// //                 "https://akgroup.ultsol.cloud" // Alternative production URL
// //               )
// //               .AllowAnyHeader()
// //               .AllowAnyMethod()
// //               .AllowCredentials();              // IMPORTANT: Required for auth cookies/tokens
// //     });
// // });

// // // Register our simple services
// // builder.Services.AddSingleton<DatabaseHelper>();
// // builder.Services.AddScoped<IDashboardService, DashboardService>();

// // var app = builder.Build();

// // // Configure pipeline
// // if (app.Environment.IsDevelopment())
// // {
// //     app.UseSwagger();
// //     app.UseSwaggerUI();
// // }

// // // Order matters - CORS should come before Authorization
// // app.UseCors("AllowReact");
// // app.UseAuthorization();
// // app.MapControllers();

// // app.Run();
// using StatisticsBackend.Data;
// using StatisticsBackend.Services;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.IdentityModel.Tokens;
// using System.Text;

// var builder = WebApplication.CreateBuilder(args);

// // Add services
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // Load configuration explicitly
// builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
// builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);
// builder.Configuration.AddEnvironmentVariables();

// // JWT Authentication
// var jwtSecret = builder.Configuration["Jwt:Secret"] ?? 
//                 Environment.GetEnvironmentVariable("JWT_SECRET") ??
//                 "your-super-secret-key-at-least-32-characters-long-for-production";
// var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "StatisticsBackend";
// var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "StatisticsBackendUsers";

// var key = Encoding.ASCII.GetBytes(jwtSecret);

// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
// })
// .AddJwtBearer(options =>
// {
//     options.RequireHttpsMetadata = false;
//     options.SaveToken = true;
//     options.TokenValidationParameters = new TokenValidationParameters
//     {
//         ValidateIssuerSigningKey = true,
//         IssuerSigningKey = new SymmetricSecurityKey(key),
//         ValidateIssuer = true,
//         ValidIssuer = jwtIssuer,
//         ValidateAudience = true,
//         ValidAudience = jwtAudience,
//         ClockSkew = TimeSpan.Zero
//     };
// });

// // CORS for React
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowReact", policy =>
//     {
//         policy.WithOrigins(
//                 "http://localhost:5173",
//                 "http://localhost:3000",
//                 "https://akgroup.ultsol.com",
//                 "https://akgroup.ultsol.cloud",
//                 "https://dashboard.ultsol.cloud"
//               )
//               .AllowAnyHeader()
//               .AllowAnyMethod()
//               .AllowCredentials();
//     });
// });

// // Register services
// builder.Services.AddSingleton<DatabaseHelper>();
// builder.Services.AddScoped<IDashboardService, DashboardService>();

// var app = builder.Build();

// // Configure pipeline
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
// else
// {
//     app.UseHsts();
// }

// app.UseCors("AllowReact");
// app.UseAuthentication();
// app.UseAuthorization();
// app.MapControllers();

// app.Run();

using StatisticsBackend.Data;
using StatisticsBackend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Load configuration explicitly
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);
builder.Configuration.AddEnvironmentVariables();

// JWT Authentication
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? 
                Environment.GetEnvironmentVariable("JWT_SECRET") ??
                "your-super-secret-key-at-least-32-characters-long-for-production";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "StatisticsBackend";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "StatisticsBackendUsers";

var key = Encoding.ASCII.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,
        ValidateAudience = true,
        ValidAudience = jwtAudience,
        ClockSkew = TimeSpan.Zero
    };
});

// CORS for React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "https://akgroup.ultsol.com",
                "https://akgroup.ultsol.cloud",
                "https://dashboard.ultsol.cloud"
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Register services
builder.Services.AddSingleton<DatabaseHelper>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseCors("AllowReact");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();