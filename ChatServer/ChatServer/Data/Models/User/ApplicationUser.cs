﻿using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace ChatServer.Data.Models.User
{
    using Data.Models.Group;
    using Data.Models.User.Request;

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            Groups = new HashSet<Group>();
            UsersGroups = new HashSet<UserGroup>();
            Requests = new HashSet<Request.Request>();
        }

        public IEnumerable<Group> Groups { get; set; }

        public IEnumerable<UserGroup> UsersGroups { get; set; }

        public IEnumerable<Request.Request> Requests { get; set; }
    }
}
