import urllib.request
class Source:         
        'Class for souce site treatment'
        
        URL=None;

        def __init__(self, url):
                self.URL = url
        
        def get_source(self):
                return urllib.request.urlopen(self.URL).read().decode(encoding='utf-8',errors='ignore') #it needs the decode, to use find()

        def get_cheat(self):
                texto=self.get_source()
                start_tag = '<td class="cheats right">'
                end_tag='</td>'
                comeco = texto.find(start_tag,len(start_tag))            
                fim = texto.find(end_tag,comeco+len(end_tag))                              
                url =texto[comeco:fim+len(end_tag)]
                
                print("Start char number in text: ",comeco)
                print("End char number in text: ",fim)
                print("Text chars number: ",len(url))
                print("Text from start to end: ",url)
                

