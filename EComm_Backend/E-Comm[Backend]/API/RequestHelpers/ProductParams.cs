namespace API.API.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string SerachTerm { get; set; }
        public string Types { get; set; }
        public string Brands { get; set; }
    }
}
