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
    public class UserRepository : IUserRepository
    {

        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<User> GetByUserNameAndPaswword(string userName, string password)
        {
           return await _dataContext.UsersDb.FirstOrDefaultAsync(u => u.UserName == userName && u.Password == password);     
        }

        public async Task<User> Register(User user)
        {
           
            _dataContext.UsersDb.Add(user);
            await _dataContext.SaveChangesAsync();
            return user;
        }
    }
}
