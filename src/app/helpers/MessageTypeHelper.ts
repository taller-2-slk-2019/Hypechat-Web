export class MessageTypeHelper {

  private static translations =
    {
      text: 'Texto',
      code: 'Snippet',
      file: 'Archivo',
      image: 'Imágen'
    };

  public static translate(type: string) {
    return MessageTypeHelper.translations[type];
  }

}
