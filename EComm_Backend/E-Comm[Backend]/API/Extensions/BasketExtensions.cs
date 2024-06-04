/*
using API.API.DTOs;
using API.API.Entities;

namespace API.API.Extensions
{
    public static class BasketExtensions
    {

        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}


using System.Linq;
using API.API.DTOs;
using API.API.Entities;

namespace API.API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {

            if (basket == null || basket.Items == null)
            {
                return null; 
            }

            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product?.Name, 
                    Price = item.Product.Price,
                    PictureUrl = item.Product?.PictureUrl,
                    Type = item.Product?.Type,
                    Brand = item.Product?.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}

*/

using System.Linq;
using API.API.DTOs;
using API.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {

            if (basket == null || basket.Items == null)
            {
                return null; 
            }

            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product?.Name, 
                    Price = item.Product.Price,
                    PictureUrl = item.Product?.PictureUrl,
                    Type = item.Product?.Type,
                    Brand = item.Product?.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(b => b.BuyerId == buyerId);

        }
    }
}

