using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.IRepositories
{
    public interface IEmployeeRoleRepository
    {
        Task<IEnumerable<EmployeeRole>> GetAllAsync();
        Task<EmployeeRole> GetByIdAsync(int id);


    }
}
