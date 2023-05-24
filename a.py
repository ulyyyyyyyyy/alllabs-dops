from pydub import AudioSegment

s = AudioSegment.from_file("RivalR.wav")
sf = s.speedup(1.5)
sf.export('RR.wav', format="wav")

