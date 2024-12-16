using MngEmployees.Core.Entities;
using MngEmployees.Core.IRepositories;
using MngEmployees.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Services.Services
{
    public class UserService : IUserService
    {
        public readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<User> GetByUserNameAndPaswword(string userName, string password)
        {
            return await _userRepository.GetByUserNameAndPaswword(userName, password);
        }

        public async Task<User> Register(string userName, string password)
        {
            var userExists=await _userRepository.GetByUserNameAndPaswword(userName,password);
            if (userExists is not null)
            {
                throw new Exception("User already exists.");
            }
            User newUser = new User { UserName = userName, Password = password };
            return await _userRepository.Register(newUser);
             
        }
    }
}
