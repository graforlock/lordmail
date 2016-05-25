import {repeat} from '../../utils/template';

export default `
          <td class="two-column">
                        <!--[if (gte mso 9)|(IE)]>
                        <table width="100%">
                        <tr>
                        ${repeat(2).html(
                                `<td width="50%" valign="top">
                                <![endif]-->
                                <div class="column">
                                <table width="100%">
                                <tr>
                                        <td class="inner">
                                        <table class="contents">
                                                <tr>
                                                        <td>
                                                                <img src="http://placehold.it/280x100" width="280" alt="" />
                                                        </td>
                                                </tr>
                                                <tr>
                                                        <td class="text">
                                                                Maecenas sed ante pellentesque, posuere leo id, eleifend dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
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