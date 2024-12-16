using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MngEmployees.Api.Models;
using MngEmployees.Core.Entities;
using MngEmployees.Core.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MngEmployees.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;

        public UserController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;

        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _userService.GetByUserNameAndPaswword(loginModel.UserName, loginModel.Password);

            if (user == null) { return Unauthorized(); }

            return Ok(CreateJWT(user));
        }

        [HttpPost]
        [Route("logUp")]
        public async Task<IActionResult> Logup([FromBody] LoginModel loginModel)
        {
            var user = await _userService.Register(loginModel.UserName, loginModel.Password);
            if (user == null) { return Unauthorized(); }
            return Ok(CreateJWT(user));

        }
            private object CreateJWT(User user)
        {
                var claims = new List<Claim>()
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim("UserName", user.UserName)
                };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return new { Token = tokenString };
        }
    }
}
