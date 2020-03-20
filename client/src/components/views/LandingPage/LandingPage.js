import React, { useEffect } from "react";


// Test Code Start

import axios from "axios";

// Test Code End



function LandingPage() {

    
    // Test Code Start

    useEffect(() => {
        axios.get("/api/hello").then(response => {console.log(response.data)})
    }, [])

    // Test Code End



    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage;