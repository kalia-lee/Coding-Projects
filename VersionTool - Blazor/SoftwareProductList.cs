public class Software
{
    public string Name { get; set; }
    public string Version { get; set; }
}

public static class SoftwareManager
{
    public static IEnumerable<Software> GetAllSoftware()
    {
        return new List<Software>
        {
            new Software
            {
                Name = "MS Word",
                Version = "13.2.1"
            },
            new Software
            {
                Name = "AngularJS",
                Version = "1.7.1"
            },
            new Software
            {
                Name = "Angular",
                Version = "13"
            },
            new Software
            {
                Name = "React",
                Version = "0.0.5"
            },
            new Software
            {
                Name = "Vue.js",
                Version = "2.6"
            },
            new Software
            {
                Name = "Visual Studio",
                Version = "17.0.31919.166.0"
            },
            new Software
            {
                Name = "Visual Studio",
                Version = "16.11.9.3.55"
            },
            new Software
            {
                Name = "Visual Studio Code",
                Version = "1.63"
            },
            new Software
            {
                Name = "Blazor",
                Version = "3.2.0"
            }
        };
    }
}
