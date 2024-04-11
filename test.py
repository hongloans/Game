def compute_lps_array(pattern):
    """
    주어진 패턴 문자열에 대한 접두사와 접미사의 일치를 계산하는 함수.
    """
    lps = [0] * len(pattern)  # 접두사와 접미사의 일치를 저장할 배열 초기화
    length = 0  # 초기 길이는 0

    # 패턴 문자열을 순회하면서 lps 배열을 채움
    i = 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text, pattern):
    """
    주어진 텍스트 문자열에서 주어진 패턴 문자열을 검색하는 함수.
    """
    m = len(pattern)
    n = len(text)
    lps = compute_lps_array(pattern)  # 패턴 문자열에 대한 lps 배열 계산
    i = 0  # 텍스트 문자열의 인덱스
    j = 0  # 패턴 문자열의 인덱스

    while i < n:
        if pattern[j] == text[i]:
            i += 1
            j += 1

            if j == m:
                print("패턴 문자열이 텍스트 문자열에서 발견됨 인덱스:", i - j)
                j = lps[j - 1]
        else:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1

# 예시 사용
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"
kmp_search(text, pattern)
