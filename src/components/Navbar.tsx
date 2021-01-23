import React from "react"
import { Link } from "gatsby"
import { AppBar, Toolbar } from "@material-ui/core"

export default () => {
    return (
        <AppBar position="sticky">
            <Toolbar
                style={{
                    justifyContent: "space-evenly",
                }}
            >
                <Link to="/">Home</Link>
                <Link to="/AboutAuthor">Tracy</Link>
                <Link to="/Books">Books</Link>
                <Link to="/">Sets/Props</Link>
                <Link to="/">Visual Arts</Link>
                <Link to="/">Crafts</Link>
                <Link to="/Blog">Blog</Link>
                <Link to="/">Contact</Link>
                <Link to="/">Upcoming Events</Link>
            </Toolbar>
        </AppBar>
    )
}
