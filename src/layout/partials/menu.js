export default ({menu, trans}) => (`
                ${menu ?         
                    `<td class="one-column">
                        <table width="100%">
                            <tr>
                                <td class="inner contents">
                                    ${trans ? 
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
                    </td>`
                : ''}`)
