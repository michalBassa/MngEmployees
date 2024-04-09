using MngEmployees.Core.Entities;
using MngEmployees.Core.IRepositories;
using MngEmployees.Core.IServices;
using MngEmployees.Data;
using MngEmployees.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Services.Services
{
    public class EmployeeRoleService: IEmployeeRoleService
    {
        readonly IEmployeeRoleRepository _employeeRoleRepository;
        public EmployeeRoleService(IEmployeeRoleRepository employeeRoleRepository)
        {
            _employeeRoleRepository = employeeRoleRepository;
        }
        public async Task<IEnumerable<EmployeeRole>> GetAllAsync()
        {
            return await _employeeRoleRepository.GetAllAsync();
        }
        public async Task<EmployeeRole> GetByIdAsync(int id)
        {
            return await _employeeRoleRepository.GetByIdAsync(id);
        }

    }
}
