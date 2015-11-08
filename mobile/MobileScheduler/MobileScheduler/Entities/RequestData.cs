namespace MobileScheduler.Entities
{
    public class RequestData<T>
    {
        public bool result { get; set; }
        public T data { get; set; }
    }
}