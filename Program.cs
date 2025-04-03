// using Microsoft.AspNetCore.Hosting;
// using Microsoft.Extensions.Hosting;
// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast")
// .WithOpenApi();

// app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }


// namespace MyAspNetCoreApp
// {
//     public class Program
//     {
//         public static void Main(string[] args)
//         {
//             CreateHostBuilder(args).Build().Run();
//         }

//         public static IHostBuilder CreateHostBuilder(string[] args) =>
//             Host.CreateDefaultBuilder(args)
//                 .ConfigureWebHostDefaults(webBuilder =>
//                 {
//                     webBuilder.UseStartup<Startup>();
//                 });
//     }
// }
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Models;
using MongoDB.Driver;

enum Subject
{
    Maths,
    Science,
    SS,
    English,
    Hindi,
    Gujarati,
    PE,
    Extra
}

namespace MyAspNetCoreApp
{
    public class Program
    {
        public class Student_options
    {
        private IMongoCollection<T> ConnectToMongo<T>(in string col)
        {
            var dbClient = new MongoClient("mongodb://localhost:27017");
            var db = dbClient.GetDatabase("School");
            return db.GetCollection<T>(col);
            // var grades = db.GetCollection<Grades>("Grades");
        }
        public void GetGrades(int standard, int rn, int year, string div)
        {
            var col = ConnectToMongo<Grades>("Grades");
            int std = standard>13?13:standard;
            string stud_id = Convert.ToString(year) + div + (rn<10?"0":"") + Convert.ToString(rn);
            for(int i = std - 1; i > 0; i--)
            {
                var filter = Builders<Grades>.Filter.Eq(p => p.StudentId, stud_id);
                filter &= Builders<Grades>.Filter.Eq("Standard", i);
                var docs = col.Find(filter);
                foreach(Grades g in docs.ToList())
                    Console.WriteLine("English:" + g.English);  
            }
        }

        public void GetTimeTable(int roomNo)
        {
            var col = ConnectToMongo<Class>("Class");
            var docs = col.Find(p => p.RoomNumber == roomNo).ToList();
            Console.WriteLine(docs[0].Friday[0].Subject);
            Console.WriteLine(docs[0].Friday[0].Teacher);
        }

        public void GetClassmates(int std, char div, int rn)
        {
            var col = ConnectToMongo<Student>("Students");
            var filter = Builders<Student>.Filter.Eq("Standard", std);
            filter &= Builders<Student>.Filter.Eq("Division", div);
            filter &= Builders<Student>.Filter.Ne("Roll_no", rn);
            var docs = col.Find(filter).ToList();
            Console.WriteLine(docs[0].FullName);
        }

        public void GetCalendar()
        {

        }
    }

    public class Faculty_options
    {
        private IMongoCollection<T> ConnectToMongo<T>(in string col)
        {
            var dbClient = new MongoClient("mongodb://localhost:27017");
            var db = dbClient.GetDatabase("School");
            return db.GetCollection<T>(col);
            // var grades = db.GetCollection<Grades>("Grades");
        }

        public void GetTimeTable(string fn, string ln)
        {
            var col = ConnectToMongo<Faculty>("Faculty");
            var fil = Builders<Faculty>.Filter.Eq("FirstName", fn);
            fil &= Builders<Faculty>.Filter.Eq("LastName", ln);
            var docs = col.Find(fil);
            foreach(Faculty f in docs.ToList())
            {
                List<Faculty_lec>[] fl = [f.Monday, f.Tuesday, f.Wednesday, f.Thursday, f.Friday, f.Saturday];            
                foreach(List<Faculty_lec> day in fl)
                {
                        Console.Write(day[0].RoomNumber + " ");
                        Console.Write(day[1].RoomNumber + " ");
                        Console.Write("Break ");
                        Console.Write(day[2].RoomNumber + " ");
                        Console.Write(day[3].RoomNumber + " ");
                        Console.WriteLine();
                }
            }
        }

        public void SetMarks(bool hod, int std, string div)
        {
            if(!hod)
            {
                Console.WriteLine("Only H.O.D. is allowed to enter marks");
                return;
            }
            var col = ConnectToMongo<Grades>("Grades");
            var col2 = ConnectToMongo<Student>("Students");
            var fil = Builders<Student>.Filter.Eq("Standard", std);
            fil &= Builders<Student>.Filter.Eq("Division", div);
            var docs = col2.Find(fil);
            foreach(Student s in docs.ToList())
            {
                string id = Console.ReadLine();
                col.InsertOne(new Grades {
                    StudentId = id, Standard = std,
                    Maths = Convert.ToInt32(Console.ReadLine()), Science = Convert.ToInt32(Console.ReadLine()),
                    English = Convert.ToInt32(Console.ReadLine()), SS = Convert.ToInt32(Console.ReadLine()),
                    Hindi = Convert.ToInt32(Console.ReadLine()), Gujarati = Convert.ToInt32(Console.ReadLine()),
                    PE = Convert.ToInt32(Console.ReadLine()), Extra = Convert.ToInt32(Console.ReadLine())
                });
            }
        }
    }

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
            // Student_options s_o = new Student_options{};
            // s_o.GetGrades(2, 3, 2023, "A");
            // s_o.GetTimeTable(101);
            // s_o.GetClassmates(2, 'A', 1);
            // Faculty_options f_o = new Faculty_options{};
            // f_o.GetTimeTable("Jayesh", "Parmar");
            // f_o.SetMarks(true, 2, "A");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
    }
}
