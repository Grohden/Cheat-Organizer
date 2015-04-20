import urllib.request
from array import *

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
                url=[]
                while counter != -1:
                    start_tag = '<td class="left">'
                    end_tag = '</tr>'
                    start = texto.find(start_tag,counter)
                    end = texto.find(end_tag,counter)
                    url.append(texto[start:end])
                    counter=texto.find('<td class="left">',counter+1)

                
                #print("Start char number in text: ",start)
                #print("End char number in text: ",end)
                #print("Text chars number: ",len(url))
                #print("Text from start to end: ",url)

                #url= url.replace("<td class=\"left\">", "\n")
                #url= url.replace("<br />", "\n")
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
x=0
print(len(s.getCheat()))
while (x!=len(s.getCheat())):
    print(s.getCheat()[x]+'\n') #at this point i'm able to get all cheats from the site
    x +=1

