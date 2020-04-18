﻿using ChatServer.Controllers;
using ChatServer.Data.Models.User;
using ChatServer.Features.User.Models;
using ChatServer.Features.User.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ChatServer.Features.User.Controllers
{
    [Authorize]
    public class FriendsController : ApiController
    {
        private readonly IFriendsService friendsService;

        public FriendsController(IFriendsService friendsService)
        {
            this.friendsService = friendsService;
        }

        [HttpPost]
        [Route("add")]
        public async Task<ActionResult> AddFriendAcync(FriendRequestModel model)
        {
            var currentUserId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (model.UserId == null)
            {
                return BadRequest();
            }

            var friend = new Friend
            {
                CurrentUserId = currentUserId,
                OtherUserId = model.UserId,
            };

            var result = await this.friendsService.AddAsync(friend);

            if (result.Succeeded)
            {
                return Ok(model.UserId);
            }

            return BadRequest(result.Errors);
        }
    }
}