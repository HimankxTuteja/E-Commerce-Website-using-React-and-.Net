using Microsoft.AspNetCore.Identity;

namespace API.API.Entities
{
    public class User : IdentityUser<string>
    {
        public UserAddress Address { get; set; }
    }
}
