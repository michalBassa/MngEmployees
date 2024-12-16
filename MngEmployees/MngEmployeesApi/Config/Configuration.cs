using AutoMapper;
using Microsoft.AspNetCore.Cors.Infrastructure;
using MngEmployees.Core.IRepositories;
using MngEmployees.Core.IServices;
using MngEmployees.Data.Repositories;
using MngEmployees.Services.Services;

namespace MngEmployees.Api.Config
{
    public static class Configuration
    {
        public static void ConfigurationService(this IServiceCollection services)
        {
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IEmployeeRoleService, EmployeeRoleService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IEmployeeRoleRepository, EmployeeRoleRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            
            //var mappingConfig = new MapperConfiguration(mc =>
            //{
            //    mc.AddProfile(new MappingProfile());
            //});

            //IMapper mapper = mappingConfig.CreateMapper();
            //services.AddSingleton(mapper);
        }
    }
}
