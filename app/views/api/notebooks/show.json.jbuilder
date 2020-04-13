json.notebook do
    json.partial! 'api/notebooks/notebook', notebook: @notebook
end
json.notes do 
    json.array! @notes do |note|
        json.partial! 'api/notes/note', note: note
    end
end