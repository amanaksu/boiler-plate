import React, { useEffect } from "react";
import { useDispatch } from "react-redux"; 
import { auth } from "../_actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
    
    // option
    // - null : anybody
    // - true : possible logging user only
    // - false : do not possible logging user

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);

                if (!response.payload.isAuth) {
                    // Log In : false
                    if (option) {
                        // option : true 
                        // => 로그인 하지 않는 유저가 로그인한 유저만 들어올 수 있는 페이지에 접근했을 떄
                        props.history.push("/login");
                    }
                } else {
                    // Log In : true
                    if (adminRoute && !response.payload.isAdmin) {
                        // adminRoute : true
                        // isAdmin : false
                        // => 관리자 권한이 없는 로그인한 유저가 관리자 페이지에 접근했을 때
                        props.history.push("/");
                    } else {
                        if (!option) {
                            // option : false
                            // => 로그인한 유자가 들어올 수 없는 페이지에 접근했을 떄
                            props.history.push("/");
                        }
                    }

                }
            });            
        }, []);

        return (
            <SpecificComponent />
        );
    }

    return AuthenticationCheck;
}