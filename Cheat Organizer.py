import urllib.request
class Source:         
        'Class for souce site treatment'
        
        URL=None;

        def __init__(self, url):
                self.URL = url
        
        def getSource(self):
                #it needs the decode, to use find()
                return urllib.request.urlopen(self.URL).read().decode(encoding='utf-8',errors='ignore')

        def getCheat(self):
                texto=self.getSource()
                counter=texto.find('<')
                url=''
                while counter != -1:
                    start_tag = '<td class="cheats right">'
                    end_tag = '</td>'
                    start = texto.find(start_tag,counter)
                    end = texto.find(end_tag,counter)
                    url += texto[start:end]
                    counter=texto.find('<',counter+1)

                
                #print("Start char number in text: ",start)
                #print("End char number in text: ",end)
                #print("Text chars number: ",len(url))
                #print("Text from start to end: ",url)

                url= url.replace("<td class=\"cheats right\">", "\nCheat:\n")
                url= url.replace("<br />", "\n")
                return url

        def removeTags(self,string):
            counter = len(string)
            while counter >= len(string):
                start = string.find('<', counter)
                end = string.find('>', counter)
                string += string[start:end+1]
                counter = end
                print(counter)
            return string

s=Source('http://cheats.codetwink.com/ps2/view/984')
print(s.getCheat()) #at this point i'm able to get all cheats from the site

