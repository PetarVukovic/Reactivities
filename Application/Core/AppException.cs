namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string details=null)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        //Samo cemo imati u development modu a ne u production modu te informacije
        public int StatusCode{get;set;}
        public string Message { get; set; }

         public string Details { get; set; }
    }
   
}