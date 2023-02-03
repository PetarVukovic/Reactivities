using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
           [Required]
           [EmailAddress]
        public string Email { get; set; }
           [Required]
           [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-IZ]).{4,8}$",ErrorMessage ="PASSWORD MUST BE COMPLEX")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
    [Required]
        public string UserName { get; set; }
        
    }
}