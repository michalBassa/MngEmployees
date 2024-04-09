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
    public class RoleRepository: IRoleRepository
    {
        private readonly DataContext _dataContext;

        public RoleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _dataContext.RolesDb.ToListAsync();
        }
    }
}
