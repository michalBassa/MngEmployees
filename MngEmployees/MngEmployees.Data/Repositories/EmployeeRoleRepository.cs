using Microsoft.EntityFrameworkCore;
using MngEmployees.Core.Entities;
using MngEmployees.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Data.Repositories
{
    public class EmployeeRoleRepository: IEmployeeRoleRepository
    {
        private readonly DataContext _dataContext;

        public EmployeeRoleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<EmployeeRole>> GetAllAsync()
        {
            return await _dataContext.EmployeesRolesDb.ToListAsync();
        }
        public async Task<EmployeeRole> GetByIdAsync(int id)
        {
            return await _dataContext.EmployeesRolesDb.Where(e => e.Employee.Id == id).FirstAsync();
        }

    }
}
