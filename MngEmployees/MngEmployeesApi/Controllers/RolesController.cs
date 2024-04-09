using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MngEmployees.Core.DTO;
using MngEmployees.Core.IServices;
using MngEmployees.Services.Services;

namespace MngEmployees.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        readonly IRoleService _roleService;
        readonly IMapper _mapper;
        public RolesController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var role = await _roleService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RoleDTO>>(role));
        }
    }
}
