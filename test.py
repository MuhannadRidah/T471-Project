import json
import populartimes

output = populartimes.get_id("AIzaSyAZFFEUni2nsr77UIluMmRl5v-7XGwrAO8", "ChIJRzOiM43QwxURipDLPRqc3GY")

with open('output.json', 'w') as outfile:
  json.dump(output, outfile)

# data = json.dumps(output)
# dic = json.loads(data)

# for populartimes in dic['dic']:
#   print(populartimes['name'])
#  with open('output.json', 'w') as outfile:
#   json.dump(output, outfile)
