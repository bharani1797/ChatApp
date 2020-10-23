import React from 'react'
import "./Sidebar.css"
import DonutLarge from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutLined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat'

function Sidebar() {
    return (
        <div className="sidebar">
            
            <div className="sidebar__header">
                <Avatar src='https://i.insider.com/59c387d3ba785e34910e27b4?width=1100&format=jpeg&auto=webp'/>
                <div className="sidebar__headerRight">
                    <IconButton>
                     <DonutLarge/>
                    </IconButton>
                    <IconButton>
                     <ChatIcon/>
                    </IconButton>
                    <IconButton>
                     <MoreVertIcon/>
                    </IconButton>                 
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutLined />
                        <input placeholder="Search or start new chat" type="text"/>
                    
                </div> 
            </div>

            < div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
            </div>
        </div>     
    )
}

export default Sidebar

