using Amazon.DynamoDBv2;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuração do AWS DynamoDB
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonDynamoDB>();

// Configuração do contexto do banco de dados
builder.Services.AddSingleton<Contadbcontext>();

// Configuração dos serviços MVC
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Gestao-Pix", Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Gestao-Pix v1"));
}

// Configuração do CORS
app.UseCors(builder =>
    builder.AllowAnyOrigin() //URL do frontend
           .AllowAnyHeader()
           .AllowAnyMethod()
);

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();