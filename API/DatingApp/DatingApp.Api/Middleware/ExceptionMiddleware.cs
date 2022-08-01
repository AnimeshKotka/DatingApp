using DatingApp.Api.Errors;
using Microsoft.Extensions.Hosting;
using System.Net;
using System.Text.Json;

namespace DatingApp.Api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _evn;

        public ExceptionMiddleware(
            RequestDelegate next, 
            ILogger<ExceptionMiddleware> logger, 
            IHostEnvironment evn
            )
        {
            _next = next;
            _logger = logger;
            _evn = evn;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _evn.IsDevelopment() ?
                    new ApiException(context.Response.StatusCode, ex.Message, ex?.StackTrace.ToString())
                    : new ApiException(context.Response.StatusCode, "Internal Server error", ex?.StackTrace);

                var option = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, option);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
