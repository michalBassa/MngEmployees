using AutoMapper;
using MngEmployees.Api.Models;
using MngEmployees.Core.Entities;

namespace MngEmployees.Api.Mapping
{
    public class PostModelsMappingProfile : Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<EmployeeRolePostModel, EmployeeRole>();
        }
    }
}
