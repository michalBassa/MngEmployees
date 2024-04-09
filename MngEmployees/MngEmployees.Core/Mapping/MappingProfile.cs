using AutoMapper;
using MngEmployees.Core.DTO;
using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<EmployeeRole, EmployeeRoleDTO>().ReverseMap();
            CreateMap<Role,RoleDTO>().ReverseMap();

        }
    }
}
