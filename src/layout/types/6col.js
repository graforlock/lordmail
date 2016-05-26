import {repeat} from '../../utils/template';

export default `
              <td class="three-column">
                        <!--[if (gte mso 9)|(IE)]>
                        <table width="100%">
                        <tr>
                        ${repeat(3).html(
                            `<td width="200" valign="top">
                            <![endif]-->
                            <div class="column">
                                <table width="100%">
                                    <tr>
                                        <td class="inner">
                                            <table class="contents">
                                                <tr>
                                                    <td>
                                                        <img src="http://placehold.it/180x100" width="180" alt="" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text">
                                                        Scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut erat.
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>`
                        )}
                        </tr>
                        <tr>
                        ${repeat(3).html(
                            `<td width="200" valign="top">
                            <![endif]-->
                            <div class="column">
                                <table width="100%">
                                    <tr>
                                        <td class="inner">
                                            <table class="contents">
                                                <tr>
                                                    <td>
                                                        <img src="http://placehold.it/180x100" width="180" alt="" />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text">
                                                        Scelerisque congue eros eu posuere. Praesent in felis ut velit pretium lobortis rhoncus ut erat.
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>`
                        )}
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                    `