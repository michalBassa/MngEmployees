using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.IServices
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetAllAsync();

    }
}
