using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MngEmployees.Api.Config;
using MngEmployees.Api.Mapping;
using MngEmployees.Core.Mapping;
using MngEmployees.Data;

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;
builder.Services.AddControllers();
builder.Services.ConfigurationService();

builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseSqlServer(configuration.GetConnectionString("MngEmployeesConnectionString"));
}
);
builder.Services.AddAutoMapper(typeof(MappingProfile),typeof(PostModelsMappingProfile));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var policy = "policy";
builder.Services.AddCors(option => option.AddPolicy(name: policy, policy =>
{
    policy.AllowAnyOrigin(); policy.AllowAnyHeader(); policy.AllowAnyMethod();
}));
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder =>
{
    builder
    .AllowAnyHeader()
    .AllowAnyMethod().
    AllowAnyOrigin();
});
app.UseHttpsRedirection();
app.UseCors(policy);

app.UseAuthorization();

app.MapControllers();

app.Run();
