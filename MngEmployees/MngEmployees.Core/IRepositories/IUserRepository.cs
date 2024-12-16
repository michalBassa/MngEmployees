using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.IRepositories
{
    public interface IUserRepository
    {
        Task<User> GetByUserNameAndPaswword(string userName, string password);
        Task<User> Register(User user);
    }
}
