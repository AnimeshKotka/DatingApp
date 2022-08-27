global using DatingApp.Api.Data;
global using Microsoft.EntityFrameworkCore;
using DatingApp.Api.Extentions;
using DatingApp.Api.Middleware;
using Microsoft.Extensions.DependencyInjection.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "DatingApp", policy =>
{
    policy.WithOrigins("https://localhost:4200").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddIdentityServices(builder.Configuration);
//builder.Services.AddTransient<Seed>();

var app = builder.Build();



// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//if (args.Length == 1 && args[0].ToLower() == "seed")
//    Seed(app);

//void Seed(IHost app)
//{
//    var scopeFcatory = app.Services.GetService<IServiceScopeFactory>();

//    using (var scope = scopeFcatory.CreateScope())
//    {
//        var service = scope.ServiceProvider.GetService<Seed>();
//        service.SeedUser();
//    }
//}

app.UseCors("DatingApp");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
