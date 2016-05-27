export default ({menu, trans}) => (`
                ${menu 
                    ?         
                    `
                    <tr>
                        <td class="full-width-image">
                                        ${trans 
                                            ? 
                                            `<a href="http://www.swooneditions.com/auth/{{var customer.auth_token}}/">`
                                            :
                                            `<a href="http://www.swooneditions.com/auth/*|AUTHTOKEN|*/">`
                                            }
                                            <img src="http://placehold.it/600x100" class="logo" height="100">
                                        </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="one-column">
                            <table width="100%">
                                <tr>
                                    <td class="inner contents">
                                        ${trans 
                                        ? 
                                            `<a class="hide-mobile" href="http://www.swooneditions.com/auth/{{var customer.auth_token}}/current-editions">View All</a>
                                            <a href="http://www.swooneditions.com/auth/{{var customer.auth_token}}/chairs">Chairs</a>
                                            <a href="http://www.swooneditions.com/auth/{{var customer.auth_token}}/sofas">Sofas</a>
                                            <a href="http://www.swooneditions.com/auth/{{var customer.auth_token}}/tables">Tables</a>
                                            <a href="http://www.swooneditions.com/auth/{{var customer.auth_token}}/storage">Storage</a>
                                            <a class="hide-mobile" href="http://www.swooneditions.com/auth/{{var customer.auth_token}}/smith-mattress-story">Mattresses</a>`
                                            
                                        : 
                                        `<a class="hide-mobile" href="http://www.swooneditions.com/auth/*|AUTHTOKEN|*/current-editions">View All</a>
                                            <a href="http://www.swooneditions.com/auth/*|AUTHTOKEN|*/chairs">Chairs</a>
                                            <a href="http://www.swooneditions.com/auth/*|AUTHTOKEN|*/sofas">Sofas</a>
                                            <a href="http://www.swooneditions.com/auth/*|AUTHTOKEN|*/tables">Tables</a>
                                            <a href="http://www.swooneditions.com/auth/*|AUTHTOKEN|*/storage">Storage</a>
                                            <a class="hide-mobile" href="http://www.swooneditions.com/auth/*|AUTHTOKEN|*/smith-mattress-story">Mattresses</a>`
                                        }
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>`
                : 
                ''}`)
