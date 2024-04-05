import random
import time

def check(lands,n):
  for i in range(n):
    for j in range(12-n):
      if len(lands[i][j]) < team[i][j]['land_cnt']:
        return False
  return True

def linked_map() :
  global linked_lands
  linked_lands = dict()
  for i in range(1, (col_of_lands * row_of_lands) + 1):
    for_one = i + 1
    for_two = i + (col_of_lands+1 if (i//col_of_lands) % 2 == 0 else col_of_lands)
    for_three = i + (col_of_lands if (i//col_of_lands) % 2 == 0 else col_of_lands-1)
    for_four = i - 1
    for_five = i - (col_of_lands if (i//col_of_lands) % 2 == 0 else col_of_lands+1)
    for_six = i - (col_of_lands-1 if (i//col_of_lands) % 2 == 0 else col_of_lands)
    if ((i-1)//col_of_lands) % 2 == 0: # 짝수 층이면서
      if i%col_of_lands == 0: # 맨오른쪽
        for_one = -1
        for_two = -1
        for_six = -1
      elif i%col_of_lands == 1: # 맨왼쪽
        for_four = -1
    else: # 홀수 층이면서
      if i%col_of_lands == 0: # 맨오른쪽
        for_one = -1
      elif i%col_of_lands == 1: # 맨왼쪽
        for_three = -1
        for_four = -1
        for_five = -1

    if (i-1) // col_of_lands == 0: #첫번째 층
      for_five = -1
      for_six = -1
    elif (i - 1) // col_of_lands == row_of_lands - 1: #마지막 층
      for_two = -1
      for_three = -1


    linked_lands[i] = {
      1: for_one,
      2: for_two,
      3: for_three,
      4: for_four,
      5: for_five,
      6: for_six
    }

def get_seed():
  global land_status
  while True:
    seed = random.randint(1, row_of_lands * col_of_lands)
    if not land_status[seed]:
      land_status[seed] = True
      return seed

def map_distribution(n):
  global land_status, team, start_time
  start_time = time.time()
  lands = []
  for i in range(n):
    lands.append([])
    for j in range(12-n):
      lands[i].append([team[i][j]['seed']])
  while True:
    for i in range(n):
      for j in range(12-n):
        for land in lands[i][j]:
          for k in range(1, 7):
            _to = linked_lands[land][k]
            if _to > 0 and not land_status[_to]:
              if len(lands[i][j]) < team[i][j]['land_cnt']:
                lands[i][j].append(_to)
                land_status[_to] = True

  for i in range(n):
    for j in range(12 - n):
      team[i][j]['lands'] = lands[i][j]


def make_map(n):
  global land_status, row_of_lands, col_of_lands, team

  row_of_lands = 10
  col_of_lands = 20
  linked_map()
  land_status = [False for _ in range(row_of_lands * col_of_lands + 1)]
  team = dict()
  for i in range(n):
    team[i] = dict()
    for j in range(12-n):
      team[i][j] = {'land_cnt': random.randint(4,6), 'seed': get_seed()}


  while True:
    a = map_distribution(n)

    if a != False:
      break


  return team




print(make_map(6))
