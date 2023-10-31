using MyWebLibrary.Pages.Models;
using MyWebLibrary.Pages.Services;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<SubscriberDatabaseSettings>(
    builder.Configuration.GetSection("SubscriberDatabase"));


builder.Services.Configure<BookDatabaseSettings>(
    builder.Configuration.GetSection("BookDatabase"));

builder.Services.AddSingleton<SubscriberService>();
builder.Services.AddSingleton<BookService>();
builder.Services.AddSingleton<UserService>();

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddSession(options =>
{
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    // Enforce HTTPS in development environment
    app.UseHttpsRedirection();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseSession();

app.MapRazorPages();

app.Run();
