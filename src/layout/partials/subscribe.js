export default  `
               <td class="one-column">
                    <table width="100%">
                        <tr>
                            <td class="footer" align="center" mc:edit="footer">
                            ${ email ? `
                                    If you no longer wish to receive our emails, <a href="${ometria ? 
                                          `*|UNSUB:https://console.ometria.com/esp/unsub?acc=swooneditions|*` : `*|UNSUB|*` }">unsubscribe here</a>.
                                    <br><br>/`
                                     : `` }
                                    Swoon Editions, 6 Playhouse Court, 62 Southwark Bridge Road, London, SE1 0AT
                                    <br><br>
                                    Copyright &copy; Swoon Editions 2016. All rights reserved.
                                </td>
                            </tr>
                        </table>
                </td>
            `