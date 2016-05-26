export default ({weekly}) => (`
        <td class="one-column">
                    <table width="100%">
                        <tr>
                            <td class="inner contents">
                                <a mc:edit="preferences_button" href="*|UPDATE_PROFILE|*" class="button-long ${ weekly ? `button-secondary` : `` }">
                                    Prefer weekly emails instead? Click here.
                                </a>
                             </td>
                         </tr>
                      </table>
          </td>
          `)