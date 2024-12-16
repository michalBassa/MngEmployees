﻿using MngEmployees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MngEmployees.Core.IServices
{
    public interface IUserService
    {
        Task<User> GetByUserNameAndPaswword(string userName,string password);
        Task<User> Register(string userName, string password);
    }
}
