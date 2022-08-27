namespace DatingApp.Api.Extentions
{
    public static class DateTimeExtention
    {
        public static int CalculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}
